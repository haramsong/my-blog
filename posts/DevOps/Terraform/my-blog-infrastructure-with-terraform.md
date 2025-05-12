---
id: 2
title: "개인 블로그에 필요한 AWS 인프라 몇 분만에 배포하기(with Terraform)"
date: "2025-05-02"
summary: "현재 제 개인 블로그의 인프라를 Terraform을 이용하여 배포한 포스트 입니다."
thumbnail: "/images/DevOps/Terraform/my-blog-infrastructure-with-terraform/thumbnail-my-architecture.png"
tags: ["Terraform", "AWS", "Blog"]
---

# Terraform으로 개인 블로그 인프라 구축하기

안녕하세요! 이 글은 개인 블로그를 운영하면서 필요한 AWS 인프라를 Terraform으로 구성한 과정을 정리한 포스트입니다. 코드로 인프라를 관리하는 방식(IaC: Infrastructure as Code)에 관심 있으신 분들이 참고하기 좋은 실전 예시입니다.

# 인프라 구성 배경

제 개인 블로그는 Next.js 기반이며, output: "export" 모드를 사용해 정적 사이트로 빌드됩니다. 즉, 웹 서버 없이도 정적 리소스만으로 서비스를 운영할 수 있는 구조입니다.

그래서 저는 다음과 같은 AWS 인프라를 구성하기로 했습니다:

![제 블로그의 AWS 인프라 아키텍처](/images/DevOps/Terraform/my-blog-infrastructure-with-terraform/0368f2aa-e185-4a86-898b-68fc557a653e-my-architecture.png)

- **S3**: 정적 리소스 저장
- **Cloudfront**: 전 세계 빠른 배포와 캐싱
- **Route 53**: 도메인 연결 및 DNS 관리

# Terraform 작성

> [Terraform은](https://developer.hashicorp.com/terraform/intro) 인프라를 코드로 선언하고 관리할 수 있게 도와주는 도구입니다. 코드로 선언된 리소스는 재현성과 버전 관리가 쉬워집니다.

## Provider 구성

```json title="/provider.tf"
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = "ap-northeast-2"
  profile = var.profile
}
```

:::info
AWS 리전은 서울(ap-northeast-2)로 설정했고, 로컬의 AWS CLI 인증 프로파일을 사용합니다.
:::

## S3 구성

```json title="/s3.tf"
resource "aws_s3_bucket" "my_website" {
  bucket = var.bucket_name

  tags = {
    Name        = var.bucket_name
    Environment = "Production"
  }
}

resource "aws_s3_bucket_public_access_block" "my_bucket_acl" {
  bucket = aws_s3_bucket.my_website.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "my_website_policy" {
  bucket = aws_s3_bucket.my_website.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "cloudfront.amazonaws.com"
        },
        Action   = "s3:GetObject",
        Resource = "arn:aws:s3:::${var.bucket_name}/*",
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = "arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:distribution/${aws_cloudfront_distribution.cdn.id}"
          }
        }
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.my_bucket_acl]
}
```

S3 버킷을 생성하여, 퍼블릭 접근을 차단하고 CloudFront에서만 접근할 수 있도록 OAC(Origin Access Control) 정책을 적용합니다.

## Cloudfront 구성

```json title="/cloudfront.tf"
resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "oac-for-${var.bucket_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_cache_policy" "my_custom_cache_policy" {
  name        = "s3-website-cache-policy"
  comment     = "Website cache policy"
  default_ttl = 3600
  max_ttl     = 43200
  min_ttl     = 3600
  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "whitelist"
      headers {
        items = ["Authorization", "Origin"]
      }
    }
    query_strings_config {
      query_string_behavior = "none"
    }
  }
}

resource "aws_cloudfront_function" "my_cloudfront_function" {
  name    = "my-website-routing-function"
  runtime = "cloudfront-js-1.0"
  comment = "Function to handle my website routing"
  publish = true
  code    = file("${path.module}/function.js")
}

resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name = aws_s3_bucket.my_website.bucket_regional_domain_name
    origin_id   = "S3-${var.bucket_name}"

    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id

    origin_shield {
      enabled = true
      origin_shield_region = var.region
    }
  }

  enabled             = true
  is_ipv6_enabled     = false
  comment             = "CloudFront Distribution for ${var.bucket_name}"
  aliases             = ["blog.${var.domain_name}"]

  price_class = "PriceClass_200"

  viewer_certificate {
    acm_certificate_arn      = "arn:aws:acm:us-east-1:${data.aws_caller_identity.current.account_id}:certificate/${var.acm_id}"
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  default_cache_behavior {
    target_origin_id       = "S3-${var.bucket_name}"
    viewer_protocol_policy = "redirect-to-https"

    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    cache_policy_id = aws_cloudfront_cache_policy.my_custom_cache_policy.id
    origin_request_policy_id   = "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf" # managed cors_s3_id
    response_headers_policy_id = "5cc3b908-e619-4b99-88e5-2cf7f45965bd" # managed cors_with_preflight_id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.my_cloudfront_function.arn
    }
  }

  custom_error_response {
    error_code            = 403
    response_page_path    = "/404.html"
    response_code         = 200
    error_caching_min_ttl = 2
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
```

Cloudfront 배포를 생성하고, Cloudfront function, OAC 설정을 했습니다.

:::info
CloudFront와 S3를 안전하게 연결하려면 OAC 설정이 필요합니다. OAI는 구버전이므로 가급적 OAC를 사용하는 게 최신 가이드에 부합합니다.
:::

```json title="/function.js"
var regexExpr = /^\/.+(\.\w+$)/;

function handler(event) {
  var request = event.request;
  var olduri = request.uri;

  if (!regexExpr.test(olduri)) {
    request.uri = olduri.replace(/\/?$/, '/') + 'index.html';
    console.log('Request for [' + olduri + '] rewritten to [' + request.uri + ']');
  }

  return request;
}
```

:::info
위 함수는 /blog, /about 같은 경로 요청을 /blog/index.html, /about/index.html로 rewrite 해줍니다. 이는 정적 사이트 호스팅을 위해 필요한 설정으로, Cloudfront function에 사용될 함수입니다.
:::

## Route 53 구성

```json title="/route53.tf"
data "aws_route53_zone" "my_route53_zone" {
  name         = var.domain_name
  private_zone = false
}

resource "aws_route53_record" "my_record" {
  zone_id = data.aws_route53_zone.my_route53_zone.zone_id
  name    = "blog.${data.aws_route53_zone.my_route53_zone.name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.cdn.domain_name
    zone_id                 = aws_cloudfront_distribution.cdn.hosted_zone_id
    evaluate_target_health  = false
  }
}
```

Route 53에 CloudFront를 연결해 커스텀 도메인(예: blog.example.com)으로 접근할 수 있도록 설정했습니다.

## 배포 과정

```bash
terraform init
terraform plan
terraform apply
```

- **init**: 필요한 provider 설치
- **plan**: 생성/변경/삭제될 리소스 사전 확인
- **apply**: 실제 인프라 적용

## 결과 확인

S3, CloudFront, Route 53 모두 정상적으로 설정된 것을 콘솔에서 확인할 수 있습니다.

### S3 확인

![S3 버킷 생성 확인](/images/DevOps/Terraform/my-blog-infrastructure-with-terraform/07b1b354-af6a-43e7-8b22-089301703ce4-SCR-20250502-oers.png)

![OAC 정책 확인](/images/DevOps/Terraform/my-blog-infrastructure-with-terraform/f7080732-0640-446a-bc57-ea0f9251cbad-SCR-20250502-ofsj.png)

### Cloudfront 확인

![Cloudfront 배포 생성 확인](/images/DevOps/Terraform/my-blog-infrastructure-with-terraform/90954d59-8a5d-459c-bb4a-9d996ab79bfb-SCR-20250502-oeys.png)

![Cloudfront 원본 확인](/images/DevOps/Terraform/my-blog-infrastructure-with-terraform/039129a9-0b07-4c65-b1e9-13010f112aec-SCR-20250502-oghm.png)

![Cloudfront 캐시 동작 확인](/images/DevOps/Terraform/my-blog-infrastructure-with-terraform/f630006e-8123-4a75-80c9-0548dce46628-SCR-20250502-ogqx.png)

### Route 53 확인

![Route 53 설정 확인](/images/DevOps/Terraform/my-blog-infrastructure-with-terraform/7555b0c2-c2cf-4f1d-8fba-499f17adbbbe-SCR-20250502-ofmk.png)

# 마무리

Terraform을 이용하니 클릭 몇 번 없이도 필요한 리소스를 한번에 관리하고, 코드 기반으로 추적/관리할 수 있어 편리했습니다. 특히 이후 블로그를 마이그레이션하거나 다른 환경에 재구성할 때도 손쉽게 인프라를 재사용할 수 있는 큰 장점이 있습니다.

다음에 기회가 된다면, Terraform 관련 포스트를 더 작성해보도록 하겠습니다.

# 참고 자료

- 📝 [Terraform 공식 문서](https://developer.hashicorp.com/terraform/intro)
- 📘 [AWS OAC(Origin Access Control) 소개 문서](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)
- 🧠 [CloudFront Functions 공식 가이드](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html)

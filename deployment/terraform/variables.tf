# Terraform variables

variable "project_id" {
  description = "Google Cloud Project ID"
  type        = string
}

variable "region" {
  description = "Google Cloud Region (asia-northeast1 is Tokyo, asia-northeast2 is Osaka)"
  type        = string
  default     = "asia-northeast1"
}

variable "domain_name" {
  description = "Custom domain name for the application"
  type        = string
  default     = "meiliyuyue.com"
}

variable "environment" {
  description = "Environment (development, staging, production)"
  type        = string
  default     = "production"
}

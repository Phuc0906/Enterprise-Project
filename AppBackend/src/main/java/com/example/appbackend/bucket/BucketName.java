package com.example.appbackend.bucket;

public enum BucketName {
    PRODUCT_IMAGE("gr-project-bucket");

    private final String bucketName;

    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }
}

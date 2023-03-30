package com.example.appbackend.bucket;

import lombok.Getter;

@Getter
public enum BucketName {
    PRODUCT_IMAGE("gr-project-bucket");

    private final String bucketName;

    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }
}

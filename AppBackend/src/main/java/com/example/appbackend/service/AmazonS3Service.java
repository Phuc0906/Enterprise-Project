package com.example.appbackend.service;

import com.example.appbackend.bucket.BucketName;
import com.example.appbackend.filestore.FileStore;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.apache.http.entity.ContentType.*;

import static org.springframework.http.MediaType.IMAGE_JPEG;
import static org.springframework.http.MediaType.IMAGE_PNG;


@Service
@RequiredArgsConstructor
public class AmazonS3Service {
    @Autowired
    private FileStore fileStore;

    public void uploadImage(MultipartFile file[], Long productId) {
        for (int i = 0; i < file.length; i++) {
            uploadImageToS3(file[i], productId, i);
        }
    }

    private void uploadImageToS3(MultipartFile file, Long productId, int imgOrder) {
        // check if file empty
        if (file.isEmpty()) {
            throw new IllegalStateException("File is empty");
        }

        // check if image is valid or not
//        isImage(file);

        Map<String, String> metadata = extractMetadata(file);

        String path = BucketName.PRODUCT_IMAGE.getBucketName();
        String fileName = String.format("%s-%s.png", productId, imgOrder);
        try {
            fileStore.save(path, fileName, Optional.of(metadata), file.getInputStream());
        }catch (Exception ex) {
            throw new IllegalStateException(ex);
        }

    }

    private void isImage(MultipartFile file) {
        if (!Arrays.asList(IMAGE_JPEG.getType(), IMAGE_PNG.getType()).contains(file.getContentType())) {
            throw new IllegalStateException("Wrong image format");
        }
    }

    private Map<String, String> extractMetadata(MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-length", String.valueOf(file.getSize()));
        return metadata;
    }
}

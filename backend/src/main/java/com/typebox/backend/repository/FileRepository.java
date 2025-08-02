package com.typebox.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.typebox.backend.entity.FileEntity;

import jakarta.transaction.Transactional;

@Repository
public interface FileRepository extends CrudRepository<FileEntity,String> {
	
	List<FileEntity> findByParentDir(String parentDir);
	
	@Modifying
	@Transactional
	@Query(value = "INSERT INTO files (id, name, file_path, type, color, owner_id, created_at, last_modified, is_deleted, parent_dir) " +
	               "VALUES (:id, :name, :filePath, :type, :color, :ownerId, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false, :parentDir)", nativeQuery = true)
	void insertFileEntity(
	    @Param("id") String id,
	    @Param("name") String name,
	    @Param("filePath") String filePath,
	    @Param("type") String type,
	    @Param("color") String color,
	    @Param("ownerId") String ownerId,
	    @Param("parentDir") String parentDir
	);

}

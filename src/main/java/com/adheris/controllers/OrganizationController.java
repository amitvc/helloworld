package com.adheris.controllers;

import java.io.File;

import javax.websocket.server.PathParam;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.adheris.model.Department;
import com.adheris.model.Organization;

@RestController
public class OrganizationController {

	@RequestMapping(value = "/organization", method = RequestMethod.GET)
	public ResponseEntity<Organization> getOrganization() {
		try {
			JAXBContext context = JAXBContext.newInstance(Organization.class);
			Unmarshaller unmarshaller = context.createUnmarshaller();
			Organization org = (Organization) unmarshaller.unmarshal(new File ("config.xml"));
			return new ResponseEntity<Organization>(org, HttpStatus.OK);
		}catch(Exception ex) {
			ex.printStackTrace();
			return new ResponseEntity (ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// localhost:8080/department?deptId=xyz
	@RequestMapping(value= "/department", method = RequestMethod.GET)
	public ResponseEntity<Department> getDepartment(@RequestParam("deptId") String deptId) {
		try {
			JAXBContext context = JAXBContext.newInstance(Organization.class);
			Unmarshaller unmarshaller = context.createUnmarshaller();
			Organization org = (Organization) unmarshaller.unmarshal(new File ("config.xml"));
			for(Department dept : org.getDepartments()) {
				if(dept.getName().equalsIgnoreCase(deptId)) {
					return new ResponseEntity<Department>(dept, HttpStatus.OK);
				}
			}
		}catch(Exception ex) {
			ex.printStackTrace();
			return new ResponseEntity (ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return null;
	}
	
	// TODO -- 
	// 1. Add method to get department like this url - http://localhost:8080/department/{department Id}
	// 2. Add method to get all employes by age >= url http://localhost:8080/employees?age=45
	// 3. Challenging - Put new employee to a department- sample http://localhost:8080/department/{department name} 
	// This will be a post call. Think about this ???
	
}

package com.adheris.controllers;

import java.io.File;

import javax.websocket.server.PathParam;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.adheris.model.Config;
import com.adheris.model.Department;
import com.adheris.model.Employee;
import com.adheris.model.Organization;

@RestController
public class OrganizationController {

	@RequestMapping(value = "/resource/config", method = RequestMethod.GET)
	public ResponseEntity<Config> getOrganization() {
		try {
			JAXBContext context = JAXBContext.newInstance(Config.class);
			Unmarshaller unmarshaller = context.createUnmarshaller();
			Config config = (Config) unmarshaller.unmarshal(new File ("config.xml"));
			return new ResponseEntity<Config>(config, HttpStatus.OK);
		}catch(Exception ex) {
			ex.printStackTrace();
			return new ResponseEntity (ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// localhost:8080/department?deptId=xyz
	@RequestMapping(value= "/resource/department", method = RequestMethod.GET)
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
	
	@RequestMapping(value="/resource/department/{deptId}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<Employee> addEmployee(@PathVariable("deptId") String deptId, @RequestBody Employee employee) {
		try {
			JAXBContext context = JAXBContext.newInstance(Organization.class);
			Unmarshaller unmarsherller = context.createUnmarshaller();
			Marshaller marshaller = context.createMarshaller();
			Organization org = (Organization) unmarsherller.unmarshal(new File ("config.xml"));
			for (Department dept : org.getDepartments()) {
				if (dept.getName().equalsIgnoreCase(deptId)){
					dept.addEmployee(employee);
				}
			}
			marshaller.marshal(org, new File("config.xml"));
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Employee> (employee, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity(employee, HttpStatus.OK);
	}
	@RequestMapping(value="/resource/department/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE )
	public ResponseEntity<Department> addDepartment(@RequestBody Department department) {
		try {
			JAXBContext context = JAXBContext.newInstance(Organization.class);
			Unmarshaller unmarsherller = context.createUnmarshaller();
			Marshaller marshaller = context.createMarshaller();
			Organization org = (Organization) unmarsherller.unmarshal(new File ("config.xml"));
			org.addDepartment(department);
			marshaller.marshal(org, new File("config.xml"));
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Department> (department, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity(department, HttpStatus.OK);
	}
	
	// TODO -- 
	// 1. Add method to get department like this url - http://localhost:8080/department/{department Id}
	// 2. Add method to get all employes by age >= url http://localhost:8080/employees?age=45
	// 3. Challenging - Put new employee to a department- sample http://localhost:8080/department/{department name} 
	// This will be a post call. Think about this ???
	
}

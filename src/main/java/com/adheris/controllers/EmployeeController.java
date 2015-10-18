package com.adheris.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.adheris.model.Employee;

@RestController(value="/helloWorlProgram")
public class EmployeeController {

	@RequestMapping(method = RequestMethod.GET, value="/hello/{value}")
	public String helloWorld(@PathVariable String value) {
		return "Hello " + value;
	}
	
	
	@RequestMapping(method = RequestMethod.POST, value = "/date")
	public String date() {
		return new Date().toString();
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/employee")
	public ResponseEntity<List<Employee>> empl() {
		List<Employee> emp = new ArrayList<Employee>();
		Employee empl = new Employee ();
		empl.setName("Terry");
		empl.setAge(50);
		empl.setSex("Male");
		emp.add(empl);
	    empl = new Employee ();
		empl.setName("Amit");
		empl.setAge(33);
		empl.setSex("Male");
		emp.add(empl);
		return new ResponseEntity<List<Employee>>(emp, HttpStatus.OK);
		
	}
	
}

package com.adheris;

import java.io.File;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.adheris.model.Department;
import com.adheris.model.Employee;
import com.adheris.model.Organization;

@SpringBootApplication
public class AppMain {

	
	public static void writeConfig() {
		Organization org = new Organization();
		org.setOrgName("Adheris Corporation");
		Department devDept = new Department();
		devDept.setName("Development Department");
		Employee emp1 = new Employee();
		emp1.setName("Tracy Keech");
		emp1.setAge(45);
		emp1.setSex("Female");
		
		devDept.getEmployees().add(emp1);
		emp1 = new Employee();
		emp1.setName("Mike Hancock");
		emp1.setSex("Male");
		emp1.setAge(50);
		devDept.getEmployees().add(emp1);
		
		Department sqaDept = new Department();
		sqaDept.setName("Sqa Department");
		emp1 = new Employee();
		emp1.setName("Scott");
		emp1.setAge(45);
		emp1.setSex("Male");
		sqaDept.getEmployees().add(emp1);
		
		org.getDepartments().add(devDept);
		org.getDepartments().add(sqaDept);
		
		try {
			JAXBContext context = JAXBContext.newInstance(Organization.class);
			Marshaller marshaller = context.createMarshaller();
			marshaller.marshal(org, new File("config.xml"));
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		
	}
	public static void main(String[] args) {
		//AppMain.writeConfig();
		SpringApplication.run(AppMain.class, args);
	}

}

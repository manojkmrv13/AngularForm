import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormBuilder, NgForm, Validators } from '@angular/forms';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { AgeValidator } from "../custom-validators/age.validator";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
profileForm = new FormGroup({
	  Fname: new FormControl(null, [Validators.required,Validators.minLength(4)]),
	  Lname: new FormControl(null, [Validators.required,Validators.minLength(2)]),
	  Email: new FormControl(null, [Validators.required,Validators.pattern("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$")]),
	  Mobile: new FormControl(null, [Validators.required,Validators.pattern('^[6-9][0-9]{9}')]),
	  dob:new FormControl(null, [AgeValidator]),
	  Address: new FormControl(null, [Validators.required,Validators.minLength(2),Validators.maxLength(150)]),
	  City: new FormControl(null, [Validators.required,Validators.minLength(4)]),
	  State: new FormControl(null, [Validators.required,Validators.minLength(4)]),
	  Password: new FormControl(null, [Validators.required,Validators.minLength(8),Validators.maxLength(20)]),
	  Cpassword: new FormControl(null)
	  
	  });
  constructor() { }

  ngOnInit(): void {
	
  }

saveDetails(profileForm: NgForm){
	console.log(profileForm.value);
}
get Fname() { return this.profileForm.get('Fname'); }
get Lname() { return this.profileForm.get('Lname'); }
get Email() { return this.profileForm.get('Email'); }
get Mobile() { return this.profileForm.get('Mobile'); }
get dob() { return this.profileForm.get('dob'); }
get Address() { return this.profileForm.get('Address'); }
get City() { return this.profileForm.get('City'); }
get State() { return this.profileForm.get('State'); }
get Password() { return this.profileForm.get('Password'); }
get Cpassword() { return this.profileForm.get('Cpassword'); }

onalphaKey(x){ // appending the updated value to the variable
    var code = x.which ? x.which : x.keyCode;
	//console.log(x.target.value)
		if (code !== 37 && code !== 39) {
			 var pos = x.target.selectionStart;
			 x.target.value = x.target.value.replace(/[^A-Za-z ]/g, '');
			 x.target.selectionStart = pos;
			 x.target.selectionEnd = pos;
			 x.preventDefault();
		}
  }
  
  onnumberKey(x){ // appending the updated value to the variable
    var code = x.which ? x.which : x.keyCode;
	//console.log(x.target.value)
		if (code !== 37 && code !== 39) {
			 var pos = x.target.selectionStart;
			 x.target.value = x.target.value.replace(/[^0-9]/g, '');
			 x.target.selectionStart = pos;
			 x.target.selectionEnd = pos;
			 x.preventDefault();
		}
  }

}

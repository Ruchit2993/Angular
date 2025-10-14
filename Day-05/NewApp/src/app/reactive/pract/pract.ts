import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pract',
  imports: [ReactiveFormsModule,RouterModule,NgIf],
  templateUrl: './pract.html',
  styleUrl: './pract.css'
})
export class Pract {
  // name = new FormControl('');
  // password = new FormControl('');

  // displayValues() {
  //   console.log('Name:', this.name.value);
  //   console.log('Password:', this.password.value);
  // }

  profileForm = new FormGroup({
    name : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required, Validators.minLength(6)])
  });

  onSubmit(){
    console.log(this.profileForm.value)
  }
  // setValues(){
  //   this.profileForm.setValue({
  //   name : 'setValueName',
  //   password : 'setValuePassword'
  // });
  // }
  get name(){
    return this.profileForm.get('name');
  }
  get password(){
    return this.profileForm.get('password');
  }
}

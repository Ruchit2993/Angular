import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  // Form model
  contact = {
    name: '',
    email: '',
    phone: '',
    website: '',
    subject: '',
    message: '',
    contactMethod: '',
    priority: 'normal'
  };

  subjects = [
    'General Inquiry',
    'Technical Support',
    'Sales Question',
    'Feedback',
    'Bug Report',
    'Feature Request',
    'Other'
  ];

  submitted = false;
  submittedData: any = null;
  maxMessageLength = 500;

  onSubmit(form: any) {
    this.submitted = true;
    this.submittedData = { ...this.contact };
    console.log('Contact Form Submitted!', this.contact);
    console.log('Form Valid:', form.valid);
  }

  onReset(form: any) {
    form.reset();
    this.submitted = false;
    this.submittedData = null;
    this.contact = {
      name: '',
      email: '',
      phone: '',
      website: '',
      subject: '',
      message: '',
      contactMethod: '',
      priority: 'normal'
    };
  }

  getRemainingCharacters(): number {
    return this.maxMessageLength - (this.contact.message?.length || 0);
  }
}


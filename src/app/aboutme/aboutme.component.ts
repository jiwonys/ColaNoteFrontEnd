import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent {
  downloadResume() {
    const resumePath = './assets/resume.pdf';
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'Jiwon_Kim_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

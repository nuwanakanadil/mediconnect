import { Component } from '@angular/core';
import {
  BriefcaseIcon,
  MailIcon,
  PhoneIcon,
  SaveIcon,
  StethoscopeIcon,
  UserIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent {
  readonly UserIcon = UserIcon;
  readonly MailIcon = MailIcon;
  readonly PhoneIcon = PhoneIcon;
  readonly SaveIcon = SaveIcon;
  readonly StethoscopeIcon = StethoscopeIcon;
  readonly BriefcaseIcon = BriefcaseIcon;
}
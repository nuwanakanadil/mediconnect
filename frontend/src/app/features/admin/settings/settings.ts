import { Component } from '@angular/core';
import {
  BellIcon,
  LockIcon,
  SaveIcon,
  SettingsIcon,
  ShieldCheckIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class SettingsComponent {
  readonly SettingsIcon = SettingsIcon;
  readonly BellIcon = BellIcon;
  readonly LockIcon = LockIcon;
  readonly ShieldCheckIcon = ShieldCheckIcon;
  readonly SaveIcon = SaveIcon;
}
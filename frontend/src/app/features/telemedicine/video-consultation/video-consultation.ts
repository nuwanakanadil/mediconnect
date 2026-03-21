import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
  PhoneOffIcon,
  MessageSquareIcon,
  SettingsIcon,
  UserIcon,
  ClockIcon,
  LucideAngularModule,
} from 'lucide-angular';

type ActiveTab = 'chat' | 'notes';

@Component({
  selector: 'app-video-consultation',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './video-consultation.html',
  styleUrl: './video-consultation.css',
})
export class VideoConsultationComponent {
  readonly MicIcon = MicIcon;
  readonly MicOffIcon = MicOffIcon;
  readonly VideoIcon = VideoIcon;
  readonly VideoOffIcon = VideoOffIcon;
  readonly PhoneOffIcon = PhoneOffIcon;
  readonly MessageSquareIcon = MessageSquareIcon;
  readonly SettingsIcon = SettingsIcon;
  readonly UserIcon = UserIcon;
  readonly ClockIcon = ClockIcon;

  isMuted = false;
  isVideoOff = false;
  isSidebarOpen = true;
  activeTab: ActiveTab = 'chat';

  toggleMute() {
    this.isMuted = !this.isMuted;
  }

  toggleVideo() {
    this.isVideoOff = !this.isVideoOff;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  setActiveTab(tab: ActiveTab) {
    this.activeTab = tab;
  }
}
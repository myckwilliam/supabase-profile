import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService, Profile } from '../supabase.service';
import { Session } from '@supabase/supabase-js';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  loading = false;
  profile: Profile | undefined;

  private readonly supabase = inject(SupabaseService);
  session = this.supabase.session;

  ngOnInit() {
    this.getProfile();
  }

  async getProfile() {
    try {
      this.loading = true;
      const { data: profile, error, status } = await this.supabase.profile;

      if (error && status !== 406) {
        throw error;
      }

      if (profile) {
        this.profile = profile;
      }
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      this.loading = false;
    }
  }

  async updateProfile(username: string, website: string, avatar_url: string) {
    try {
      this.loading = true;
      const profile = { username, website, avatar_url };
      await this.supabase.updateProfile(profile);
      await this.getProfile();
      alert('Profile updated!');
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      this.loading = false;
    }
  }

  async signOut() {
    this.supabase.signOut();
  }
}

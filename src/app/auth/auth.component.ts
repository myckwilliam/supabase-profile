import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loading = false;
  signUp = false;
  title = 'Sign in';
  altOption = 'Sign up';
  buttonText = 'Login';

  private readonly supabase = inject(SupabaseService);

  async handleLogin(email: string, password: string) {
    try {
      this.loading = true;
      await this.supabase.signIn(email, password);
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      this.loading = false;
    }
  }

  async handleRegister(email: string, password: string) {
    try {
      this.loading = true;
      await this.supabase.signUp(email, password);
      alert('Check your email for confirmation!');
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      this.loading = false;
    }
  }

  callAction(email: string, password: string) {
    this.signUp
      ? this.handleRegister(email, password)
      : this.handleLogin(email, password);
  }

  switchAction() {
    this.signUp = !this.signUp;
    this.title = this.signUp ? 'Sign up' : 'Sign in';
    this.altOption = this.signUp ? 'Sign in' : 'Sign up';
    this.buttonText = this.signUp ? 'Register' : 'Login';
  }
}

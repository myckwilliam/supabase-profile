import { SupabaseService } from './../supabase.service';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent {
  _avatarUrl: SafeResourceUrl | undefined;
  uploading = false;

  @Input() set avatarUrl(url: string | undefined) {
    if (url) {
      this.downloadImage(url);
    }
  }

  @Output() upload = new EventEmitter<string>();

  private readonly supabase = inject(SupabaseService);
  private readonly dom = inject(DomSanitizer);

  async downloadImage(url: string) {
    try {
      const { data } = await this.supabase.downloadImage(url);
      if (data instanceof Blob) {
        this._avatarUrl = this.dom.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(data)
        );
      }
    } catch (error: any) {
      console.error('Error downloading image: ', error.message);
    }
  }

  async uploadAvatar(event: any) {
    try {
      this.uploading = true;
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      await this.supabase.uploadImage(filePath, file);
      this.upload.emit(filePath);
    } catch (error: any) {
      alert(error.message);
    } finally {
      this.uploading = false;
    }
  }
}

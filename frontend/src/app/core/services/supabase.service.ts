import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      "https://ombvnpeoietugpxelugs.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tYnZucGVvaWV0dWdweGVsdWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODM2ODYsImV4cCI6MjA2NzU1OTY4Nn0.mv9NsqrC2tckMmHa2w0X8Vg0fGtjsQXYYbMG1LRy9K4"
    );
  }

  async uploadFile(file: File): Promise<string> {
    if (!file) throw new Error("No file selected");

    const timeStamp = new Date().getTime();
    const newFileName = `${timeStamp}-${file.name.replace(/\s+/g, '_')}`;
    const filePath = `mediconnect/${newFileName}`;

    const { data, error } = await this.supabase.storage
      .from("cropcartimages")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false
      });

    if (error) {
      console.error("Error uploading image:", error);
      throw error;
    }

    const { data: { publicUrl } } = this.supabase.storage
      .from("cropcartimages")
      .getPublicUrl(filePath);

    return publicUrl;
  }
}

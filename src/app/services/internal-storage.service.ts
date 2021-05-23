import { Injectable } from '@angular/core';
import 'capacitor-secure-storage-plugin';
import { Plugins } from '@capacitor/core';

const { SecureStoragePlugin } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class InternalStorageService {

  constructor() { }
  async set(key:string,value:string){
    const storage = SecureStoragePlugin.set({ key, value });
    return storage;
  }
  async get(key:string){
    const storage = SecureStoragePlugin.get({key})
    return storage;
  }
  async getkeys(){
    const storage = SecureStoragePlugin.keys()
    return storage; 
  }
  async clear(){
    const storage = SecureStoragePlugin.clear()
    return storage; 
  }
  async delete(key:string){
    const storage = SecureStoragePlugin.remove({key})
    return storage;
  }
   update(key:string){

  }
}

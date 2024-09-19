import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConfignotiService {
    userdata: any;
  constructor(private http: HttpClient) {
    this.userdata = JSON.parse(localStorage.getItem('user'))
   }

  getMessages(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiaXIiLCJhdWQiOjEsImx1biI6eyJpZCI6MSwicGVybWlzc2lvbl9pZCI6MiwiY29kZSI6IjAwMDAxIiwidXNlcl9pZCI6ImFkbWluIiwibmFtZSI6IlRoYXdhdGNoYWkiLCJlbWFpbCI6ImRlbW9ucmlkZXJjb3MyMjJAZ21haWwuY29tIiwidGVsIjoiMDY1NDEyODc0IiwicmVnaXN0ZXJfZGF0ZSI6IjIwMjMtMDctMjciLCJpbWFnZSI6Imh0dHBzOlwvXC9iaXIuZGV2LWFzaGEuY29tXC9pbWFnZXNcL3VzZXJzXC8xY2JkY2M1MzYxZmQ5YTA1ZjdmZGFjZDI1NGZlZGM1OS5qcGciLCJzdGF0dXMiOiJZZXMiLCJjcmVhdGVfYnkiOiJhZG1pbiIsInVwZGF0ZV9ieSI6ImFkbWluIiwiY3JlYXRlZF9hdCI6IjIwMjMtMDctMDVUMDg6Mjk6NTQuMDAwMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIzLTEyLTEyVDA3OjU5OjQxLjAwMDAwMFoiLCJ0eXBlIjoidXNlciIsInBlcm1pc3Npb24iOnsiaWQiOjIsIm5hbWUiOiJBZG1pbiIsImNyZWF0ZV9ieSI6ImFkbWluIiwidXBkYXRlX2J5IjoiYWRtaW4iLCJjcmVhdGVkX2F0IjoiMjAyMy0wNy0wNVQwODoyOTo1NC4wMDAwMDBaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDMtMjZUMTM6MjM6MTkuMDAwMDAwWiJ9fSwiaWF0IjoxNzE4MTAxNjY2LCJleHAiOjE3NDk2NTg1OTIsIm5iZiI6MTcxODEwMTY2Nn0.OnEV087UO_5_EKEMmwXhIagZaPbRmsIAOEdS5QbiIpc`
    });
    return this.http.post(environment.baseURL + `/api/chat_page`, {
      "member_id": this.userdata.id,
      "draw": 1,
      "columns": [],
      "order": [
        {
          "column": 0,
          "dir": "asc"
        }
      ],
      "start": 0,
      "length": 100,
      "search": {
        "value": "",
        "regex": false
      }
    }, { headers: headers });
  }

  sendMessages(chatId: number, message: string,userid: number, type: string): Observable<any> {
    return this.http.post(environment.baseURL + `/api/chat_msg`, {
      "chat_id": chatId,
      "user_id": userid,
      "message": message,
      "type": type
    });
  }

  uploadFile(chatId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', '/files/asset_chat_smg/');
    return this.http.post(environment.baseURL + `/api/upload_file`, formData);
  }

  uploadImage(chatId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('path', '/images/asset_chat_smg/');
    return this.http.post(environment.baseURL + `/api/upload_images`, formData);
  }
  Savedata(data: any): Observable<any> {
    return this.http
        .post(environment.baseURL + '/api/notify_alert', data)
        .pipe(
            switchMap((response: any) => {
                return of(response.data);
            })
        );
}

getDate(name: string): Observable<any> {
    return this.http
        .get(environment.baseURL +  `/api/get_date/${name}`)
        .pipe(
            switchMap((response: any) => {
                return of(response.data);
            })
        );
}


  delete(id: number): Observable<any> {
    return this.http.delete(environment.baseURL + `/api/notify_alert/${id}`);
  }
  deletesub(id: number): Observable<any> {
    return this.http.delete(environment.baseURL + `/api/notify_alert_day/${id}`);
  }

}



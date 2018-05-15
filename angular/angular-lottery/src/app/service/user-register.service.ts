import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { Http, Headers, Request, RequestOptions, Response, RequestMethod, URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';
import { User } from '../model/user-model';

@Injectable()
export class UserRegisterService {
    public userRegisterURL = "data/user-register.json";
    public testEmailURL = "";
    public subject: Subject<User> = new Subject<User>();

    constructor(
        public http:Http,
        ) {
    }

    public get currentUser():Observable<User>{
        return this.subject.asObservable();
    }

    public register(user: User){
        console.log(user);
        
        //向后台post数据的写法如下
        // let data = new URLSearchParams();
        // data.append('email', user.email);
        // data.append('password', user.password);
        // return this.http.post(this.userRegisterURL,data);
        
        return this.http
                    .get(this.userRegisterURL).pipe(
                        map((response: Response) => {
                            let user = response.json();
                            localStorage.setItem("currentUser",JSON.stringify(user));
                            this.subject.next(user);
                        })
                    );
    }

    public testEmail(email:string){
        return this.http.get(this.testEmailURL).pipe(
            map((response: Response) => response.json())
        );
    }
}
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../../models/user.model';
import {Observable, tap} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(User: User): Observable<any> {
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, User)
            .pipe(tap(this.setToken));
    }

    private setToken(response: any) {
        if (response) {
            const expData = new Date(new Date().getTime() + Number(response.expiresIn) * 1000);
            localStorage.setItem('fb-token-exp', expData.toString());
            localStorage.setItem('fb-token', response.idToken);
        } else {
            localStorage.clear();
        }
    }

    get token() {
        const expDateString = localStorage.getItem('fb-token-exp')

        if (!expDateString) {
            return null;
        }

        const expDate = new Date(expDateString);

        if (new Date > expDate) {
            this.logout();
            return null
        }
        return localStorage.getItem('fb-token');
    }

    logout() {
        this.setToken(null);
    }

    isAuthenticated() {
        return !!this.token;
    }

}

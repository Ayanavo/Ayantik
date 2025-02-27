import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInAnonymously, signInWithEmailAndPassword, signInWithPopup, updateProfile, UserCredential } from "@angular/fire/auth";
import { defer, from, Observable } from "rxjs";


type LoginConfig = {
    email: string;
    password: string;
};

type RegisterConfig = {
    username: string;
    email: string;
    password: string;
};

@Injectable({
    providedIn: "root",
})
export class AuthService {
    http = inject(HttpClient);
    auth = inject(Auth);


    LogIn(params: LoginConfig): Observable<UserCredential | any> {
        // return from(signInWithEmailAndPassword(this.auth, params.email, params.password).then((res) => {}));
        return defer(() => signInWithEmailAndPassword(this.auth, params.email, params.password));
    }

    RegisterUser(params: RegisterConfig): Observable<void | any> {
        return from(createUserWithEmailAndPassword(this.auth, params.email, params.password).then((res) => updateProfile(res.user, { displayName: params.username })));
    }

    setAuthProvider(providertype): Observable<UserCredential | any> {
        switch (providertype) {
            case "google":
                return (this.AuthLogin(new GoogleAuthProvider()));
            case "github":
                return (this.AuthLogin(new GithubAuthProvider()));
            case "facebook":
                return (this.AuthLogin(new FacebookAuthProvider()));
            default:
                return from("type error match");
        }
    }


    // setRecaptchaAuth(): Observable<void>{
    //     const appCheck = new AppCheck(this.auth, { provider: new ReCaptchaV3Provider("6LeiDhoqAAAAAKsbuvQta4Y7b1JBvlntRqZNE0y3") });
    //     return this.appCheck.checkAction("recaptcha-v3", appCheck);
    // }

    GuestLogin(){
      return  defer(() =>signInAnonymously(this.auth));
    }

    AuthLogin(pararms) {
        return  defer(() => signInWithPopup(this.auth, pararms));
    }
}

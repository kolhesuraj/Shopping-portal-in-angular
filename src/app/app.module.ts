import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import {
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  // SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpsInterceptor } from './services/http/http.interceptor';
import { cartAction } from './shopping/State/cart.reducer';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { hydrationMetaReducer } from './shopping/State/hydrate.state';
import { ExpiryDatePipe } from './shopping/services/Pipes/expiry-date.pipe';

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HotToastModule.forRoot(),
    RecaptchaV3Module,
    StoreModule.forRoot({ cart: cartAction }, { metaReducers }),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '893913805202-rg7o6somctq21ike6dk1u0d696t64e0q.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('365586852354146'),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptor, multi: true },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

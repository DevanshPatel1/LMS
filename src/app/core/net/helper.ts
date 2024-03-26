import { HttpHeaders, HttpResponseBase } from '@angular/common/http';
import { Injector, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN } from '@delon/auth';
import { ALAIN_I18N_TOKEN } from '@delon/theme';
import { NzNotificationService } from 'ng-zorro-antd/notification';
export interface ReThrowHttpError {
  body: any;
  _throw: true;
}
export const CODEMESSAGE: { [key: number]: string } = {
  200: 'The server successfully returned the requested data. ',
  201: 'Create or modify data successfully. ',
  202: 'A request has entered the background queue (asynchronous task). ',
  204: 'Data deleted successfully. ',
  400: 'There was an error in the request issued, and the server did not create or modify data. ',
  401: 'User does not have permission (token, username, password incorrect). ',
  403: 'The user is authorized, but access is prohibited. ',
  404: 'The request was made for a record that does not exist, and the server did not perform the operation. ',
  406: 'The requested format is not available. ',
  410: 'The requested resource has been permanently deleted and will not be available again. ',
  422: 'A validation error occurred while creating an object. ',
  500: 'A server error occurred, please check the server. ',
  502: 'Gateway error. ',
  503: 'The service is unavailable, the server is temporarily overloaded or under maintenance. ',
  504: 'Gateway timeout. '
};
export function goTo(injector: Injector, url: string): void {
  setTimeout(() => injector.get(Router).navigateByUrl(url));
}
export function toLogin(injector: Injector): void {
  injector.get(NzNotificationService).error(`未登录或登录已过期，请重新登录。`, ``);
  goTo(injector, injector.get(DA_SERVICE_TOKEN).login_url!);
} 
export function getAdditionalHeaders(headers?: HttpHeaders): { [name: string]: string } {
  const res: { [name: string]: string } = {};
  const lang = inject(ALAIN_I18N_TOKEN).currentLang;
  if (!headers?.has('Accept-Language') && lang) {
    res['Accept-Language'] = lang;
  }

  return res;
}

export function checkStatus(injector: Injector, ev: HttpResponseBase): void {
  if ((ev.status >= 200 && ev.status < 300) || ev.status === 401) {
    return;
  }

  const errortext = CODEMESSAGE[ev.status] || ev.statusText;
  injector.get(NzNotificationService).error(`请求错误 ${ev.status}: ${ev.url}`, errortext);
}

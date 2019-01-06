import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()

export class AjaxService {
    counterMonitor = 0;
    httpOptions: any;
    constructor(private http: Http) {
        this.httpOptions = {
            headers: new Headers({
              'Content-Type':  'application/json'
            //   'Authorization': 'my-auth-token'
            })
          };
    }

    getData(url) {
        return this.http.get(url)
            .pipe(
                map((res: Response) => {
                    try {
                        this.counterMonitor = 0;
                        return res.json();
                    } catch {
                        return throwError({
                            statusCode: false,
                            error: 'Error occured while fetching data'
                        });
                    }
                }),
                catchError((res: Response) => {
                    if (this.counterMonitor <= 5) {
                        this.counterMonitor += 1;
                        return this.getData(url);
                    }
                    return this.onError(res);
                })
            );
    }

    postData(url, data) {
        return this.http.post(url, data, this.httpOptions)
            .pipe(
                map((res: Response) => {
                    console.log(res);
                    try {
                        return res.json();
                    } catch {
                        return throwError({
                            statusCode: false,
                            error: 'Error occured posting data'
                        });
                    }
                }),
                catchError((res: Response) => {
                    console.log(res);
                    return this.onError(res);
                })
            );
    }

    onError(res: Response) {
        return throwError(res.json());
    }
}

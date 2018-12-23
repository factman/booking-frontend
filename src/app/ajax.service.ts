import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()

export class AjaxService {
    counterMonitor = 0;
    constructor(private http: Http) { }

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
                            error: 'Error occured why fetching data'
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

    onError(res: Response) {
        return throwError(res.json());
    }
}

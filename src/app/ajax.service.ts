import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()

export class AjaxService {

    constructor(private http: Http) { }

    getData(url) {
        return this.http.get(url)
            .pipe(
                map((res: Response) => {
                    try {
                        return res.json();
                    } catch {
                        return throwError({
                            statusCode: false,
                            error: 'Error occured why fetching data'
                        });
                    }
                }),
                catchError((res: Response) => this.onError(res))
            );
    }

    onError(res: Response) {
        return throwError(res.json());
    }
}

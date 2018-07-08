import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from './location.model';
import { NgRedux } from '../../../../node_modules/@angular-redux/store';
import { environment } from '../../../environments/environment';
import { LocationActions } from './location.actions';

const APP = environment.APP;

@Injectable()
export class LocationService {

    constructor(private ngRedux: NgRedux<ILocation>) { }

    get(): Observable<ILocation> {
        const state = this.ngRedux.getState();
        if (!state || !state.lat || !state.lng) {
            const s = localStorage.getItem('location-' + APP);
            if (s) {
                const location = JSON.parse(s);
                this.ngRedux.dispatch({ type: LocationActions.UPDATE, payload: location});
            } else {
                this.clear();
            }
        }

        return this.ngRedux.select<ILocation>('location');
    }

    set(location: ILocation) {
        localStorage.setItem('location-' + APP, JSON.stringify(location));
        this.ngRedux.dispatch({ type: LocationActions.UPDATE, payload: location});
    }

    clear() {
        localStorage.removeItem('location-' + APP);
        this.ngRedux.dispatch({ type: LocationActions.CLEAR});
    }

}


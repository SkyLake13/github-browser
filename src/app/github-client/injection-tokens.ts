import { InjectionToken } from "@angular/core";
import { ApiService } from "./api-service.interface";

export const API_SERVICE = new InjectionToken<ApiService>('Github search service');
export const API_BASE_URL = new InjectionToken<string>('Github api base url');
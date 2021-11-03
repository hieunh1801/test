interface SpmedDataResponse<T> {
  items?: Array<T>;
}

interface SpmedStatusResponse {
  code?: string;
  message?: string;
}

interface SpmedResponse<T> {
  data?: SpmedDataResponse<T>;
  status?: SpmedStatusResponse;
}

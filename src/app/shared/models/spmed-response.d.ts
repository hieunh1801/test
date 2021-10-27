interface SpmedDataResponse {
  items?: Array<any>;
}

interface SpmedStatusResponse {
  code?: string;
  message?: string;
}

interface SpmedResponse {
  data?: SpmedDataResponse;
  status?: SpmedStatusResponse;
}

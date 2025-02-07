interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
    error?: string;
  }
  
  export const successResponse = <T>(
    statusCode: number,
    message: string,
    data?: T
  ): ApiResponse<T> => ({
    success: true,
    statusCode,
    message,
    data,
  });
  
  export const errorResponse = (
    statusCode: number,
    message: string,
    error?: string
  ): ApiResponse<null> => ({
    success: false,
    statusCode,
    message,
    error,
  });
  
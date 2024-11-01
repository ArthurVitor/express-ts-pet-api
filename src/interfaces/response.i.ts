export default interface ApiResponse<T> {
    successful: boolean,
    data?: T,
    status_code: number,
    error_message?: string
}
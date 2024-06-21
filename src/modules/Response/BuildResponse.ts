type DataResponse =
  | {
      message?: string
      code?: number
    }
  | any

class BuildResponse {
  private static baseResponse(dataResponse: DataResponse) {
    const {
      message = 'Data has been received!',
      code = 200,
      ...rest
    } = dataResponse
    return {
      code,
      message,
      ...rest,
    }
  }

  /**
   * Response Success
   */
  public static get(dataResponse: DataResponse) {
    return this.baseResponse(dataResponse)
  }

  /**
   * Response Create
   */
  public static created(dataResponse: DataResponse) {
    return this.baseResponse({
      code: 201,
      message: 'Data has been added!',
      ...dataResponse,
    })
  }

  /**
   * Response Update
   */
  public static updated(dataResponse: DataResponse) {
    return this.baseResponse({
      message: 'The data has been updated!',
      ...dataResponse,
    })
  }

  /**
   * Response Delete
   */
  public static deleted(dataResponse: DataResponse) {
    return this.baseResponse({
      message: 'Data has been deleted!',
      ...dataResponse,
    })
  }
}

export default BuildResponse

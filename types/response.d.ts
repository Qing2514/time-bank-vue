type Ref<E> = import('vue').Ref<E>

interface BaseResponse {
  message: string
  status: number
  error?: string
  trace?: string
  path?: string
  timestamp?: string
}

interface BaseDataResponse<E> extends BaseResponse {
  data: E
}

interface SearchResponse extends BaseDataResponse<string[]> {}

interface RegistrationResponse extends BaseResponse {
  path: string
}

interface ListResponse extends BaseDataResponse<string[]> {}

interface CreationResponse extends BaseResponse {
  path: string
}

interface LoginResponse extends BaseResponse {
  accessToken: string
  refreshToken: string
}

interface VerificationResponse extends BaseResponse {}

interface BaseAbstract {}

interface UserAbstract extends BaseAbstract {
  username: string
  city: string
  teams: string[]
  roles: string[]
  followersCount: number
}

interface ActivityAbstract extends BaseAbstract {
  id: string
  type: string
  city: string
  title: string
  founder: string
  status: string
  reward: number
  number: number
  details: string
  popularity: number
  volunteersCount: number
  dateEnd: string
  dateStart: string
}

interface ArticleAbstract extends BaseAbstract {
  id: string
  title: string
  author: string
  source: string
  content: string
  dateModified: string
}

interface TeamAbstract extends BaseAbstract {
  id: string
  name: string
  city: string
  type: string
  founder: string
  description: string
}

interface AppealAbstract extends BaseAbstract {
  id: string
  username: string
  activityId: string
  status: string
  reason: string
}

interface AbstractResponse<E extends BaseAbstract>
  extends BaseDataResponse<E> {}

interface BaseInfo {}

interface UserInfo extends UserAbstract, BaseInfo {
  email: string
  phoneNumber: number
  followingCount: number
}

interface ActivityInfo extends ActivityAbstract, BaseInfo {
  address: string
  volunteers: string[]
  datePublished: string
}

interface TeamInfo extends TeamAbstract, BaseInfo {
  members: string[]
}

interface AppealInfo extends AppealAbstract, BaseInfo {
  compensation: number
  passedVerifiers: string[]
  rejectedVerifiers: string[]
}

interface ArticleInfo extends ArticleAbstract, BaseInfo {}

interface InfoResponse<E extends BaseInfo> extends BaseDataResponse<E> {}

interface UserDetail extends UserAbstract {
  fullName: string
}

interface UpdateResponse extends BaseResponse {}

interface _AsyncData<E extends BaseResponse> {
  data: Ref<E>
  pending: Ref<boolean>
  refresh: (force?: boolean) => Promise<void>
  error?: any
}

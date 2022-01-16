interface BaseRequest {}

interface BaseDataRequest<E> extends BaseRequest {
  data: E
}

interface BaseRegistration {}

interface UserRegistration extends BaseRegistration {
  identity: string
  username: string
  password: string
  fullName: string
  city: string
  email: string
  phoneNumber: number
}

interface RegistrationRequest<E extends BaseRegistration>
  extends BaseDataRequest<E> {}

interface ActivityCreation extends BaseCreation {
  type: string
  city: string
  title: string
  reward: number
  number: number
  details: string
  address: string
  dateEnd: string
  dateStart: string
}

interface ActivityReviewResult {
  id: string
  title: string
  pass: boolean
}

interface ActivitySearchFilter extends BaseSearchFilter {
  city?: string
  type?: string
  founder?: string
  statusList?: string[]
  rewardLower?: number
  rewardUpper?: number
  numberLower?: number
  numberUpper?: number
}

interface ArticleSearchFilter extends BaseSearchFilter {
  source?: string
  author?: string
  dateModifiedLower?: string
  dateModifiedUpper?: string
}

interface ActivityUpdate extends BaseUpdate {
  addition: string
  rejectedVolunteers: string[]
}

interface AppealCreation extends BaseCreation {
  reason: string
  activityId: string
  compensation: number
}

interface ArticleCreation extends BaseCreation {
  title: string
  content: string
  source: string
}

interface CreationRequest<E extends BaseCreation> extends BaseDataRequest<E> {}

interface ArticleModification extends BaseModification {
  id: string
  title: string
  content: string
  source: string
}

interface PasswordUpdate extends BaseUpdate {
  password: string
}

interface TeamModification extends BaseModification {
  name: string
  city: string
  type: string
  description: string
}

interface TeamRegistration extends BaseRegistration {
  name: string
  city: string
  type: string
  description: string
}

interface TeamSearchFilter extends BaseSearchFilter {
  city?: string
  type?: string
  founder?: string
  numberLower?: number
  numberUpper?: number
}

interface UserLogin {
  username: string
  password: string
}

interface UserLoginRequest extends BaseDataRequest<UserLogin> {}

interface UserModification extends BaseModification {
  city: string
  email: string
  phoneNumber: number
}

interface UsernameUpdate extends BaseUpdate {
  username: string
}

interface UserSearchFilter extends BaseSearchFilter {
  city: string
  userRoleList: string[]
}

interface SearchRequest<E extends BaseSearchFilter> extends BaseDataRequest<E> {
  query: string
  page?: number
  order?: string
  orderBy?: string
  pageSize?: number
}

interface UpdateRequest<E extends BaseUpdate> extends BaseDataRequest<E> {
  password: string
}

interface VotingRequest extends BaseRequest {
  id: string
  username: string
}

const TYPE: Record<string, string> = {
  community_service: '社区服务',
  environment_protection: '环境保护',
  knowledge_publicity: '知识宣传',
  aged_disabled_aid: '助老助残',
  poverty_alleviation: '扶贫济困',
  social_assistance: '社会援助',
  professtional_service: '专业服务',
  other: '其他',
}

const STATUS: { [key: string]: string } = {
  recruit: '招募中',
  verify: '审核中',
  progress: '进行中',
  publish: '公示中',
  finish: '已结束',
  passed: '已通过',
  rejected: '未通过',
  cancel: '已取消',
}

export const getTypeText = (activityType: string) => {
  return TYPE[activityType]
}

export const getStatusText = (activityStatus: string) => {
  return STATUS[activityStatus]
}

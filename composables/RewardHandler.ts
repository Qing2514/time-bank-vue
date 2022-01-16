export const getRewardInteger = (reward: string) => {
  return reward.length > 2 ? reward.substring(0, reward.length - 2) : '0'
}

export const getRewardDecimal = (reward: string) => {
  return reward.length >= 2
    ? reward.substring(reward.length - 2)
    : reward.padStart(2, '0')
}

export const toRewardCent = (reward: string) => {
  return reward.includes('.') ? reward.concat('00') : reward.replace('.', '')
}

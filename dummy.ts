export type Club = {
  id: string
  name: string
  code: string
  logo: string
}

export type Team = {
  id: string
  name: string
  clubId: string
  club: Club
}

export type EventParticipant = {
  name: string
  clubCode?: string
  teamId?: number
}

export type Event = {
  id: string
  startsAt: Date
  endsAt: Date
  name: string
  type: string
  participants: string[]
  location: {
    clubCode: string
    name: string
    address: string
    city: string
  }

}

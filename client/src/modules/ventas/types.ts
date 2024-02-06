export interface FormEventData {
    title: string,
    description: string,
    date: string,
    startTime: string,
    duration: number
    category: FormCategory
}

export interface FormCategory {
    id: string,
    text: string,
    color: string
}

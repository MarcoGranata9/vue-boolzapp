const { createApp } = Vue

const DateTime = luxon.DateTime;

createApp ({
    data() {
        return {
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    visibleSearch: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    visibleSearch: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    visibleSearch: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    visibleSearch: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    visibleSearch: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    visibleSearch: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    visibleSearch: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    visibleSearch: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],
            currentConversation: 0,
            newMessage: "",
            searchText: "",            
        }
    },
    methods: {
        takeIndex: function(index) {
            this.currentConversation = index
            console.log(this.currentConversation);
        },
        newMessageFunction: function() {
            if (this.newMessage !== "") {
                this.contacts[this.currentConversation].messages.push({
                    date: this.dateNow(),
                    message: this.newMessage,
                    status: "sent" 
                })
                setTimeout(this.replyMessageFunction, 1000)
            }
            this.newMessage = "" 
        },
        replyMessageFunction: function() {
            this.contacts[this.currentConversation].messages.push({
                date: this.dateNow(),
                message: "OK",
                status: "received"
            })
        },
        searchContact: function() {
            let searchContact = this.searchText.toLowerCase();
            this.contacts.forEach(element => {
                if (element.name.toLowerCase().includes(searchContact)) {
                    element.visibleSearch = true    
                } else {
                    element.visibleSearch = false
                }    
            });
        },
        deleteMessage: function (index) {
            this.contacts[this.currentConversation].messages.splice(index, 1)
        },
        takeLastMessage: function(index) {
            let lastMsg = "";
            if (this.contacts[index].messages.length === 0) {
                lastMsg = ""    
            } else {
                lastMsg = this.contacts[index].messages[this.contacts[index].messages.length - 1].message
            }
            return lastMsg 
        },
        dateToHourMin: function (date) {
            const fullDate = DateTime.fromFormat(date, "d/M/yyyy H:m:s")
            return fullDate.toFormat("H:m")
        },
        dateNow: function() {
            const now = DateTime.now().toFormat("d/M/yyyy H:m:s")
            return now
        },
        lastMessageDate: function(index) {
            const date = this.contacts[index].messages[this.contacts[index].messages.length - 1].date
            const fullDate = DateTime.fromFormat(date, "d/M/yyyy H:m:s")
            return fullDate.toFormat("d/M/yyyy H:m:s")
        },
        latestAccess: function(index) {
            const date = this.contacts[index].messages[this.contacts[index].messages.length - 1].date
            const fullDate = DateTime.fromFormat(date, "d/M/yyyy H:m:s")
            return fullDate.toFormat("H:m")
        }
    }
}).mount("#app")
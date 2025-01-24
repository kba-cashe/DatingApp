import { AfterViewChecked, Component, inject, input, OnInit, output, ViewChild } from '@angular/core';
import { MessageService } from '../../_services/message.service';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [TimeagoModule, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements AfterViewChecked {
  
  @ViewChild('messageInput') messageForm?: NgForm;
  @ViewChild('scrollMe') scrollContainer?: any;
  public messagesService = inject(MessageService);
  username = input.required<string>();
  messageContent = ""

  sendMessage() {
    this.messagesService.sendMessage(this.username(), this.messageContent).then(() => {
      this.messageForm?.reset();
      this.scrollToBottom();
    })
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}

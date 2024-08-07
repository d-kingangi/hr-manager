import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FaqItem }  from '../../Interfaces/faq.interface';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})

export class LandingComponent {



  toggleExpansion(faq: FaqItem): void {
    faq.expanded = !faq.expanded;
  }

  faqs: FaqItem[] = [
    { 
      question: "What are the benefits of HR-Manager?", 
      answer: "Because Labour is borderless and global, anyone can apply for a job and get paid, no matter where our Freelancers and Customers are in the world, and regardless of whether they have access to banking services. .", 
      expanded: true
    },
    { 
      question: "How can I earn on HR-Manager?", 
      answer: "Labour currently supports two major blockchains; Ethereum and BNB Chain. Freelancers and Customers can organise job payments in ETH, WBTC, TIME, and stablecoins", 
      expanded: true 
    },
    {
      question: "How does a HR-Manager Premium membership benefit Emloyees?",
      answer: "Freelancers are charged 10% in platform fees for each Job or Gig they complete. ",
      expanded: true
    },
    {
      question: "How does a HR-Manager Premium membership benefit Managers?",
      answer: "Customers receive a bonus in Labour tokens every time they make a payment to a Freelancer. This acts as an incentive for Customers to continue using Labour for all their hiring needs.",
      expanded: true
    }, 
    {
      question: "Can I apply for jobs without a Premium membership?",
      answer: "Absolutely! Labour’s cryptocurrency job market is open to all. ",
      expanded: true
    }

  ]
}

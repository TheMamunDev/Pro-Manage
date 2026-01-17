# ProManage 🚀

**Manage projects with speed and clarity.**

Welcome to **ProManage**! We built this platform with a simple philosophy:
Project management tools should empower teams, not slow them down. ProManage is
an all-in-one solution for agile teams to track tasks, manage sprints, and
collaborate in real-time without the clutter.

Whether you are a solo developer or part of a growing startup, ProManage gives
you the visibility you need to ship faster.

---

## Key Features

- **Intuitive Kanban Boards**: Visualize your workflow. Drag and drop tasks
  across columns to update their status instantly.
- **Agile Sprint Planning**: Move tasks from your backlog to active sprints.
  Track velocity and keep your team focused on the current goal.
- **Secure Authentication**: Robust sign-up and sign-in options using **Google
  OAuth** or standard credentials, powered by NextAuth.js.
- **Team Collaboration**: Built for teams. Assign roles (Admin/Member), delegate
  tasks, and keep everyone on the same page.
- **Fully Responsive**: A seamless experience across desktop, tablet, and mobile
  devices.
- **Dark Mode Support**: Because we know developers love dark mode. Switch
  themes to match your preference.

---

## Screenshots

![App Screenshot 1](https://i.ibb.co.com/1fRsXngS/modern-browser-mockup-3.png)
![App Screenshot 2](https://i.ibb.co.com/F1BTK6D/modern-browser-mockup-2.png)
![App Screenshot 3](https://i.ibb.co.com/sJF4c2Df/modern-browser-mockup-1.png)

---

## Tech Stack

ProManage is built using a modern, type-safe stack designed for performance and
scalability:

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose ODM)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) &
  [Lucide React](https://lucide.dev/)
- **Drag & Drop**: [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

---

## Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- A MongoDB connection string (local or Atlas)
- Google Cloud Console credentials (for OAuth)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/TheMamunDev/Pro-Manage.git
    cd pro-manage
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables** Create a `.env` file in the root directory
    and add the following variables:

    ```env
    # Database
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/promanage

    # NextAuth
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_super_secret_key_here

    # Google OAuth
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    ```

5.  **Open your browser** Navigate to `http://localhost:3000` to see the
    application in action.

---

## Contributing

We welcome contributions! If you have an idea for a feature or found a bug, feel
free to open an issue or submit a pull request.

Made with ❤️ by the ProManage Team.

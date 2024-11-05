# README

This project is designed to demonstrate the use of Laravel's queue system to send emails in the background. To set up and run this project, follow these steps:

**Step 1: Installation**

First, install the project by running the following command in your terminal:
```
composer install
```
This will install all the necessary dependencies required by the project.

**Step 2: Server Setup**

Next, set up the server by running the following command:
```
php artisan serve
```
This will start the Laravel development server, making the project accessible at `http://localhost:8000`.

**Step 3: Queue Setup**

To enable the queue system, run the following command to start the queue worker:
```
php artisan queue:work
```
This will start processing jobs in the queue, including the email sending job.

**Step 4: Environment Variables**

In the `.env` file, set the `MAIL_HOST` and `MAIL_PASSWORD` variables to your email server's settings. For example:
```
MAIL_HOST=smtp.gmail.com
MAIL_PASSWORD=your_email_password
```
**Default Queue Driver**

By default, the queue driver is set to `database`. This means that the queue will store jobs in the database. You can change this setting in the `.env` file by setting the `QUEUE_DRIVER` variable. For example, to use the `sync` driver, set:
```
QUEUE_DRIVER=sync
```
**GitHub**

To clone this project from GitHub, use the following command:
```
git clone https://github.com/your-github-username/project-name.git
```

After cloning, follow the steps above to set up and run the project.

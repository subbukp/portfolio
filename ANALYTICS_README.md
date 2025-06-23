# Portfolio Analytics System

This analytics system provides comprehensive visitor logging and analytics for your portfolio website.

## Features

- **Visitor Logging**: Automatically logs visitor data including page views, browser, OS, device type, and referrer
- **Privacy-First**: IP addresses are hashed to protect visitor privacy
- **Real-time Analytics Dashboard**: View visitor statistics with interactive charts and tables
- **Protected Access**: Analytics dashboard requires password authentication
- **Automatic Data Collection**: Client-side component automatically logs visits
- **JSON File Storage**: Simple file-based storage (can be upgraded to a database)

## Components

### 1. API Endpoints

- `/api/log-visit` - POST endpoint to log visitor data
- `/api/analytics` - GET endpoint to retrieve analytics data (password protected)

### 2. Client Components

- `/components/VisitorLogger.tsx` - Automatically logs page visits
- `/app/analytics/page.tsx` - Interactive analytics dashboard

### 3. Utilities

- `/lib/analytics.ts` - Core analytics functions and types

### 4. Data Storage

- `/logs/visitors.json` - JSON file storing visitor logs (max 10,000 entries)

## Setup

1. The system is already integrated into your portfolio. The `VisitorLogger` component is included in the main layout.

2. Set the analytics password as an environment variable:
   ```bash
   ANALYTICS_PASSWORD=your-secure-password
   ```

3. Access the analytics dashboard at `/analytics` and login with your password.

## Default Password

The default password is `admin123`. **Please change this immediately** by setting the `ANALYTICS_PASSWORD` environment variable.

## Analytics Dashboard Features

- **Summary Cards**: Total visits, unique visitors, most visited page, top referrer
- **Daily Visits Chart**: Shows visit trends over the last 7 days
- **Top Pages**: Most visited pages on your portfolio
- **Browser/OS/Device Distribution**: Understand your audience's technology
- **Hourly Distribution**: See when visitors are most active
- **Referrer Analysis**: Track where your visitors come from
- **Detailed Logs View**: Browse individual visitor logs

## Security Considerations

1. **Change the default password** immediately
2. IP addresses are hashed for privacy
3. User agents are truncated to prevent excessive data storage
4. The analytics endpoint requires authentication
5. Consider adding rate limiting to prevent abuse

## Future Enhancements

1. **Database Storage**: Migrate from JSON files to a proper database
2. **Geolocation**: Integrate with IP geolocation API for country/city data
3. **Advanced Analytics**: Add conversion tracking, session duration, bounce rate
4. **Export Features**: Allow data export in CSV/Excel format
5. **Real-time Updates**: Add WebSocket support for live visitor tracking
6. **Email Reports**: Automated weekly/monthly analytics reports

## Maintenance

- Logs are automatically limited to 10,000 entries to prevent file bloat
- Old logs can be cleaned using the `cleanOldLogs` function in `/lib/analytics.ts`
- Consider backing up the logs file regularly

## Usage

Visit your portfolio and navigate between pages. Then go to `/analytics` and login to see your visitor data.
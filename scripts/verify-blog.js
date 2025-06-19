const { getAllPosts, getAllTags, getAllSeries } = require('../lib/blog');

console.log('Verifying blog system...\n');

// Get all posts
const posts = getAllPosts();
console.log(`Total posts found: ${posts.length}`);

// Show first post details
if (posts.length > 0) {
  const firstPost = posts[0];
  console.log('\nFirst post details:');
  console.log(`- Title: ${firstPost.title}`);
  console.log(`- Slug: ${firstPost.slug}`);
  console.log(`- Date: ${firstPost.date}`);
  console.log(`- Tags: ${firstPost.tags.join(', ')}`);
  console.log(`- Reading time: ${firstPost.readingTime}`);
  if (firstPost.series) {
    console.log(`- Series: ${firstPost.series} (Part ${firstPost.seriesOrder})`);
  }
}

// Get all tags
const tags = getAllTags();
console.log(`\nTotal unique tags: ${tags.length}`);
console.log(`Tags: ${tags.join(', ')}`);

// Get all series
const series = getAllSeries();
console.log(`\nTotal series: ${series.length}`);
if (series.length > 0) {
  console.log(`Series: ${series.join(', ')}`);
}
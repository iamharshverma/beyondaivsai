import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { BookPage } from './pages/BookPage';
import { OrderPage } from './pages/OrderPage';
import { ChaptersPage, ChapterDetailPage } from './pages/ChaptersPage';
import { FrameworkPage } from './pages/FrameworkPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ExcerptPage } from './pages/ExcerptPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AuthorPage } from './pages/AuthorPage';
import { EducatorsPage } from './pages/EducatorsPage';
import { InsightsPage, InsightDetailPage } from './pages/InsightsPage';
import { BlogsPage } from './pages/BlogsPage';
import {
  MediaPage,
  ContactPage,
  PrivacyPage,
  TermsPage,
} from './pages/MediaContactLegalPages';

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/chapters" element={<ChaptersPage />} />
            <Route path="/chapters/:slug" element={<ChapterDetailPage />} />
            <Route path="/framework" element={<FrameworkPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/page-blog" element={<BlogsPage />} />
            <Route path="/excerpt" element={<ExcerptPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/author" element={<AuthorPage />} />
            <Route path="/educators" element={<EducatorsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<InsightDetailPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

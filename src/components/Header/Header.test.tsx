import { render, screen } from '@testing-library/react';
import Header from './Header';
describe('Header', () => {
  it('컴포넌트가 정상적으로 렌더링된다', () => {
    render(<Header />);
    const linkElement = screen.getByText('HelloWook.life');
    expect(linkElement).toBeInTheDocument();
  });

  it('Posts 링크가 정상적으로 렌더링된다', () => {
    render(<Header />);
    const postsLink = screen.getByText('Posts');
    expect(postsLink).toBeInTheDocument();
  });

  it('Posts 링크가 올바른 경로로 연결된다', () => {
    render(<Header />);
    const postsLink = screen.getByText('Posts');
    expect(postsLink).toHaveAttribute('href', '/posts');
  });

  it('Abouts 링크가 정상적으로 렌더링된다', () => {
    render(<Header />);
    const aboutsLink = screen.getByText('Abouts');
    expect(aboutsLink).toBeInTheDocument();
  });

  it('Abouts 링크가 올바른 경로로 연결된다', () => {
    render(<Header />);
    const aboutsLink = screen.getByText('Abouts');
    expect(aboutsLink).toHaveAttribute('href', '/abouts');
  });

  it('projects 링크가 정상적으로 렌더링된다', () => {
    render(<Header />);
    const projectsLink = screen.getByText('projects');
    expect(projectsLink).toBeInTheDocument();
  });

  it('projects 링크가 올바른 경로로 연결된다', () => {
    render(<Header />);
    const projectsLink = screen.getByText('projects');
    expect(projectsLink).toHaveAttribute('href', '/projects');
  });
});
